import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Card, Icon, Image } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';
import { COMENTARIOS } from '../comun/comentarios';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux'; // Importamos connect para conectar con el estado global
import { postFavorito } from '../redux/ActionCreators'; // Importamos la acción para marcar como favorito
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
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId))
})

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

                <Icon
                    raised
                    reverse
                    name={props.favorita ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                />
            </Card>


        );
    }
    else {
        return (<View><Text>ENTRA AQUI</Text></View>);
        
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


    marcarFavorito(excursionId) {
        //this.setState({ favoritos: this.state.favoritos.concat(excursionId) });
        this.props.postFavorito(excursionId);
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

            return (
                <View style={{ margin: 10 }}>
                    <Text style={{ fontSize: 14 }}>{item.comentario}</Text>
                    <Text style={{ fontSize: 12 }}>{`-- ${item.autor}, ${fecha} ${hora ? `a las ${hora}` : ""}`}</Text>
                </View>
            );
        };

        return (
            <FlatList
                data={[{ key: 'content' }]} // Datos ficticios para el FlatList principal
                renderItem={() => null} // No renderizamos items normales
                ListHeaderComponent={
                    <RenderExcursion
                        excursion={this.props.excursiones.excursiones[+excursionId]} 
                        favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}                            
                        onPress={() => this.marcarFavorito(excursionId)}
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
        );
    }
}


const styles = StyleSheet.create({
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
    description: {
        margin: 20,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion); 
