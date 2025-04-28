import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import { Card } from '@rneui/themed';
//import { ACTIVIDADES } from '../comun/actividades';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';
const mapStateToProps = state => {
    return {
        actividades: state.actividades
        , excursiones: state.excursiones
        , cabeceras: state.cabeceras
    }
}

function RenderItem(props) {

    const item = props.item;

    if (props.isLoading) { 
        return( 
            <IndicadorActividad /> 
        ); 
    } 
 
    else if (props.errMess) { 
        return( 
            <View>  
                <Text>{props.errMess}</Text> 
            </View> 
        ); 
    }

    else {  
 
        const item = props.item;

        if (item != null) {
            return (
                <Card>

                    <View style={styles.imageContainer}>
                        <Text style={styles.title}>{item.nombre}</Text>
                    </View>
                    <Card.Image source={{ uri: baseUrl + item.imagen }} />
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
}

class Home extends Component {

    /*constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES,
            cabeceras: CABECERAS,
            actividades: ACTIVIDADES
        };
    }*/

    render() {

        return (
            <ScrollView>
                <RenderItem item={this.props.cabeceras.cabeceras.filter((cabecera) => cabecera.destacado)[0]} />
                <RenderItem item={this.props.excursiones.excursiones.filter((excursion) => excursion.destacado)[0]}
                    isLoading={this.props.excursiones.isLoading}
                    errMess={this.props.excursiones.errMess} />
                <RenderItem item={this.props.actividades.actividades.filter((actividad) => actividad.destacado)[0]} />

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

//export default Home;
export default connect(mapStateToProps)(Home); 