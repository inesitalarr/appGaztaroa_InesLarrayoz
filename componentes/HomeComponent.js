import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import { Card } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';
import { CABECERAS } from '../comun/cabeceras';
import { ACTIVIDADES } from '../comun/actividades';

function RenderItem(props) {

    const item = props.item;

    if (item != null) {
        return (
            <Card>

                <View style={styles.imageContainer}>
                    <Text style={styles.title}>{item.nombre}</Text>
                </View>
                <Card.Image source={require('./imagenes/40Años.png')} />
                <Card.Divider />
                <Text style={{ margin: 20 }}>
                    {item.descripcion}
                </Text>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES,
            cabeceras: CABECERAS,
            actividades: ACTIVIDADES
        };
    }

    render() {

        return (
            <ScrollView>
                <RenderItem item={this.state.cabeceras.filter((cabecera) => cabecera.destacado)[0]} />
                <RenderItem item={this.state.excursiones.filter((excursion) => excursion.destacado)[0]} />
                <RenderItem item={this.state.actividades.filter((actividad) => actividad.destacado)[0]} />
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    imageContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        position: 'absolute',
        top: 10,
        color: 'chocolate',
        fontSize: 35,
        fontWeight: 'bold',
        zIndex: 1,
        textAlign: 'center',


    },
    description: {
        margin: 20,
    },
});

export default Home;