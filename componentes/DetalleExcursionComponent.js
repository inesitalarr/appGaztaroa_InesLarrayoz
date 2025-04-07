import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';
import { COMENTARIOS } from '../comun/comentarios';

function RenderExcursion(props) {

    const excursion = props.excursion;

    if (excursion != null) {
        return (
            <Card>
                <View style={styles.imageContainer}>
                    <Text style={styles.title}>{excursion.nombre}</Text>
                </View>
                <Card.Image source={require('./imagenes/40Años.png')} />
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
            excursiones: EXCURSIONES,
            comentarios: COMENTARIOS,
            favoritos: []
        };

    }

    marcarFavorito(excursionId) {
        this.setState({
            favoritos: this.state.favoritos.concat(excursionId
            )
        });
    }

    render() {
        const { excursionId } = this.props.route.params;
        return (
            <ScrollView>
                <RenderExcursion
                    excursion={this.state.excursiones[+excursionId]}
                    favorita={this.state.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                />
                <RenderComentario
                    comentarios={this.state.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                />
            </ScrollView>
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
        color: 'chocolate',
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

export default DetalleExcursion;