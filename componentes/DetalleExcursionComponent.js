import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, Modal, Button, TextInput } from 'react-native';
import { Card, Icon, Image } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';
import { COMENTARIOS } from '../comun/comentarios';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux'; // Importamos connect para conectar con el estado global
import { postFavorito } from '../redux/ActionCreators'; // Importamos la acción para marcar como favorito
import { Rating } from 'react-native-ratings';
import { Input } from '@rneui/base';
import { postComentario } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentarios,
        cabeceras: state.cabeceras,
        actividades: state.actividades,
        favoritos: state.favoritos,
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
    postComentario: (excursionId, valoracion, autor, comentario) => dispatch(postComentario(excursionId, valoracion, autor, comentario))
});


function RenderExcursion(props) {

    const excursion = props.excursion;

    if (excursion != null) {

        return (
            <Card>
                <View style={styles.imageContainer}>
                    <Text style={styles.title}>{excursion.nombre}</Text>
                </View>
                <Card.Image source={{ uri: baseUrl + excursion.imagen }}></Card.Image>
                <Card.Divider />
                <Text style={{ margin: 20 }}>
                    {excursion.descripcion}
                </Text>

                <View style={styles.iconContainer}>
                    <Icon
                        raised
                        reverse
                        name={props.favorita ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                    />
                    <Icon
                        raised
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color='#512DA8'
                        onPress={props.onOpenModal}
                    />
                </View>
            </Card>


        );
    }
    else {
        return (<View></View>);

    }
}



function RenderComentario(props) {
    const comentarios = props.comentarios;

    const renderCommentItem = ({ item }) => {
        let fecha = "Fecha no válida";
        let hora = "";

        const diaLimpio = item.dia.replace(/\s+/g, '');

        try {
            const fechaObj = new Date(diaLimpio);
            if (!isNaN(fechaObj)) {
                fecha = fechaObj.toLocaleDateString('es-ES', {
                    weekday: 'long', // Día de la semana
                    year: 'numeric', // Año
                    month: 'long', // Mes completo
                    day: 'numeric', // Día del mes
                });

                hora = fechaObj.toLocaleTimeString('es-ES', {
                    hour: '2-digit', // Hora con dos dígitos
                    minute: '2-digit', // Minutos con dos dígitos
                });
            }
        } catch (error) {
            console.error("Error al procesar la fecha:", error);
        }

        return (
            <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comentario}</Text>
                <Text style={{ fontSize: 12 }}>{`-- ${item.autor}, ${fecha} ${hora ? `a las ${hora}` : ""}`}</Text>
            </View>
        );
    };

    return (
        <Card>
            <Card.Title>Comentarios</Card.Title>
            <Card.Divider />
            <FlatList
                data={comentarios}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </Card>
    );
}

class DetalleExcursion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            rating: 5, // Valor inicial del Rating
            autor: '', // Campo para el nombre
            comentario: '', // Campo para el comentario
        };
    }

    marcarFavorito(excursionId) {
        //this.setState({ favoritos: this.state.favoritos.concat(excursionId) });
        this.props.postFavorito(excursionId);
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    resetForm() {
        this.setState({
            showModal: false,
            rating: 5,
            autor: '',
            comentario: '',
        });
    }

    gestionarComentario(excursionId) {
        this.props.postComentario(
            excursionId,
            this.state.rating,
            this.state.autor,
            this.state.comentario
        );
        this.resetForm(); // Resetear el formulario tras enviar
    }

    handleComment() {
        const { excursionId } = this.props.route.params;
        this.gestionarComentario(excursionId);
    }


    render() {
        const { excursionId } = this.props.route.params;
        const excursion = this.props.excursiones[+excursionId];
        const comentarios = this.props.comentarios.comentarios.filter(
            (comentario) => comentario.excursionId === excursionId
        );

        const renderCommentItem = ({ item }) => {
            let fecha = "Fecha no válida";
            let hora = "";

            const diaLimpio = item.dia.replace(/\s+/g, '');

            try {
                const fechaObj = new Date(diaLimpio);
                if (!isNaN(fechaObj)) {
                    fecha = fechaObj.toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    });

                    hora = fechaObj.toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                    });
                }
            } catch (error) {
                console.error("Error al procesar la fecha:", error);
            }

            const estrellas = Array.from({ length: item.valoracion }, (_, index) => (
                <Icon
                    key={index}
                    name="star"
                    type="font-awesome"
                    color="#FFD700" // Color dorado para las estrellas
                    size={12} // Tamaño pequeño
                />
            ));

            return (
                <View style={{ margin: 10 }}>
                    <Text style={{ fontSize: 14 }}>{item.comentario}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        {estrellas}
                    </View>
                    <Text style={{ fontSize: 12 }}>{`-- ${item.autor}, ${fecha} ${hora ? `a las ${hora}` : ""}`}</Text>
                </View>
            );
        };

        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={[{ key: 'content' }]} // Datos ficticios para el FlatList principal
                    renderItem={() => null} // No renderizamos items normales
                    ListHeaderComponent={
                        <RenderExcursion
                            excursion={this.props.excursiones.excursiones[+excursionId]}
                            favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
                            onPress={() => this.marcarFavorito(excursionId)}
                            onOpenModal={() => this.toggleModal()}
                        />
                    }
                    ListFooterComponent={
                        <Card>
                            <Card.Title>Comentarios</Card.Title>
                            <Card.Divider />
                            <FlatList
                                data={comentarios}
                                renderItem={renderCommentItem}
                                keyExtractor={(item) => item.id.toString()}
                                scrollEnabled={false} // Importante: deshabilitar scroll interno
                            />
                        </Card>
                    }
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Añadir Comentario</Text>

                        {/* Valoracion de las 5 estrellas */}
                        <Rating
                            showRating
                            startingValue={5}
                            imageSize={30}
                            onFinishRating={(value) => this.setState({ rating: Math.round(value) })}
                            style={{ marginBottom: 20 }}
                        />

                        {/* Campo para el nombre */}
                        <Input
                            placeholder="Tu Nombre"
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            onChangeText={(value) => this.setState({ autor: value })}
                            value={this.state.autor}
                        />

                        {/* Campo para el comentario */}
                        <Input
                            placeholder="Tu Comentario"
                            leftIcon={{ type: 'font-awesome', name: 'comment' }}
                            onChangeText={(value) => this.setState({ comentario: value })}
                            value={this.state.comentario}
                        />

                        {/* Botones para enviar o cancelar la review*/}
                        <View style={styles.buttonContainer}>
                            <View style={styles.buttonWrapper}>
                                <Button
                                    title="Cancelar"
                                    onPress={() => this.resetForm()}
                                    color="#888"
                                />
                            </View>
                            <View style={styles.buttonWrapper}>
                                <Button
                                    title="Enviar"
                                    onPress={() => this.handleComment()}
                                    color="#512DA8"
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        margin: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center', // Centra los botones en el contenedor
        marginTop: 20,
    },
    buttonWrapper: {
        marginHorizontal: 10, // Añade separación horizontal entre los botones
    },

    imageContainer: {
        position: 'relative',
        justifyContent: 'center', // Centra verticalmente
        alignItems: 'center',
    },
    title: {
        position: 'absolute',
        color: 'white',
        top: 10,
        fontSize: 35,
        fontWeight: 'bold',
        zIndex: 1,
        textAlign: 'center',


    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    description: {
        margin: 20,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion); 
