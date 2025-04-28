import React, { Component } from 'react';
import { ListItem, Avatar } from '@rneui/themed';
import { SafeAreaView, FlatList } from 'react-native';
//import { EXCURSIONES } from '../comun/excursiones';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones
    }
}
class Calendario extends Component {
    /*constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES
        };
    }*/

    render() {

        if (this.props.navigation.isLoading) {
            return (
                <IndicadorActividad />
            );
        }

        else if (this.props.navigation.isLoading) {
            return (
                <View>
                    <Text>{props.errMess}</Text>
                </View>
            );
        }

        else {

            const { navigate } = this.props.navigation;

            const renderCalendarioItem = ({ item, index }) => {
                return (
                    <ListItem
                        key={index}
                        onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
                        bottomDivider>
                        <Avatar source={{ uri: baseUrl + item.imagen }} />
                        <ListItem.Content>
                            <ListItem.Title>{item.nombre}</ListItem.Title>
                            <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                );
            };

            return (
                <SafeAreaView>
                    <FlatList
                        //data={this.state.excursiones}
                        data={this.props.excursiones.excursiones}
                        renderItem={renderCalendarioItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </SafeAreaView>
            );
        }
    }
}

//export default Calendario;
export default connect(mapStateToProps)(Calendario); 
