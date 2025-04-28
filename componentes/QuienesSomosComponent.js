import React, { Component } from 'react';
import { Text, View, FlatList, SafeAreaView, ScrollView } from 'react-native';
import { Card, ListItem, Avatar } from '@rneui/themed';
import actividades from '../comun/actividades'; // Importar datos de actividades
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';

const mapStateToProps = state => {
    return {
        actividades: state.actividades
    }
}

// Componente funcional Historia
const Historia = () => {
    <View>
        <Card>
            <Card.Title>Un poquito de historia</Card.Title>
            <Card.Divider />
            <Text style={{ margin: 20 }}>
                El nacimiento del club de montaña Gaztaroa se remonta a la
                primavera de 1976 cuando jóvenes aficionados a la montaña y
                pertenecientes a un club juvenil decidieron crear la sección
                montañera de dicho club. Fueron unos comienzos duros debido sobre
                todo a la situación política de entonces. Gracias al esfuerzo
                económico de sus socios y socias se logró alquilar una bajera.
                Gaztaroa ya tenía su sede social.
                {'\n'}
                {'\n'}
                Desde aquí queremos hacer llegar nuestro agradecimiento a todos
                los montañeros y montañeras que alguna vez habéis pasado por el
                club aportando vuestro granito de arena.
                {'\n'}
                {'\n'}
                Gracias!
            </Text>
        </Card>
        <Card>
            <Card.Title>"Actividades y recursos"</Card.Title>
            <Card.Divider />
        </Card>
    </View>
};


// Componente de clase QuienesSomos
class QuienesSomos extends Component {

    /* constructor(props) {
         super(props);
         this.state = {
             actividades: ACTIVIDADES
         };
     }*/

    render() {

        const renderActividadItem = ({ item }) => (
            <ListItem bottomDivider>
                <Avatar source={{ uri: baseUrl + item.imagen }} />
                <ListItem.Content>
                    <ListItem.Title>{item.nombre}</ListItem.Title>
                    <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );

        if (this.props.actividades.isLoading) {
            return (
                <IndicadorActividad />
            );
        }

        else if (this.props.actividades.isLoading) {
            return (
                <View>
                    <Text>{props.errMess}</Text>
                </View>
            );
        }

        else {
            return (
                <FlatList
                    ListHeaderComponent={<Historia />}
                    data={this.props.actividades.actividades}
                    renderItem={renderActividadItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            );
        }
    }
}

export default connect(mapStateToProps)(QuienesSomos);