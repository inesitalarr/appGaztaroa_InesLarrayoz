import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';

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
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

class DetalleExcursion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES
        };
    }

    render() {
        const { excursionId } = this.props.route.params;
        return (<RenderExcursion excursion={this.state.excursiones[+excursionId]} />);
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