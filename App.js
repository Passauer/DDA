import { Button, FlatList, ListViewBase, Modal, StyleSheet, Text, TextInput, View, } from 'react-native';
import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [texto, agregaTxt] = useState('');
  const [lista, agregaItem] = useState([]);
  const [seleccion, agregarSeleccion] = useState({});
  const [visibilidad, agregarVisibilidad] = useState(false);

  const handleChangeText = (nombre) => {agregaTxt(nombre);}
  const agregame = () => {
    const item = {
      nombre: texto,
      id: Math.random().toString(),};
    agregaItem([...lista, item,]);
    agregaTxt('');
  }

  const remover = (id) => {
    agregarVisibilidad(true);
    agregarSeleccion(lista.find(item => item.id === id));
  }

  const siBorrar = () => {
    const newList = lista.filter(item => item.id !== seleccion.id);
    agregaItem(newList);
    agregarVisibilidad(false);
    agregarSeleccion({});
  }
  const noBorrar = () => {agregarVisibilidad(false);}

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TextInput placeholder="Item" style={styles.input} onChangeText={handleChangeText} nombre={texto}/>
        <Button title="Agregar" onPress={agregame}/>
      </View>
      <View style={styles.items}>
      <FlatList
        data={lista}
        keyExtractor={item => item.id}
        renderItem={(data) => (
          <View style={styles.item} key={data.item.id}>
            <Text>{data.item.nombre}</Text>
            <Button title="X" onPress={() => remover(data.item.id)} />
          </View>
        )}
      />
      </View>
      <Modal transparent={true} visible={visibilidad} animationType="slide">
        <View style={styles.modl}>
          <View><Text>¿Esta seguro que desea borrar {seleccion.nombre}?</Text></View>
          <View style={styles.botmodl}>
            <View><Button title="Confirmar" onPress={siBorrar}/></View>
            <View><Button title="Cancelar" onPress={noBorrar}/></View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  top:{
    flex: 1,
    flexDirection:'row',
    width: 300,
    maxHeight: 35,
    marginTop:50,
    alignSelf: 'center',
  },
  input:{
    backgroundColor: '#fff',
    width: 200,
    borderWidth:1,
    padding: 10,
    marginRight: 5,
  },
  items: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },
  item:{
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    flexDirection:'row',
    alignItems:'center',
    borderWidth:1,
    justifyContent:'space-between',
  },
  modl:{
    backgroundColor:'#f3f3f3',
    height:150,
    width:300,
    borderWidth:1,
    marginTop:200,
    marginLeft:50,
    justifyContent:'space-between',
    paddingTop: 20,
    alignItems:'center',
  },
  botmodl:{
    width:300,
    flexDirection:'row',
    justifyContent:'space-between',
    padding: 40,
  },
});
