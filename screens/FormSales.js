import { Picker } from '@react-native-picker/picker'
import { Input, Text } from '@rneui/themed'
import React, { useState } from 'react'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import { createVentas } from '../services/salesAllService'

//ventas: id, id_cliente, id_producto, cantidad

export default function FormSalesScreen({ route, navigation }) {
  const state = route.params
  console.log(state)
  const productos = [
    {
      id: 1,
      nombre_p: "Televisor",
      stock: 10,
      precio: 450.00,
      id_categoria: 1
    },
    {
      id: 2,
      nombre_p: "Lavadora",
      stock: 5,
      precio: 300.00,
      id_categoria: 2
    },
    {
      id: 3,
      nombre_p: "Camiseta",
      stock: 20,
      precio: 15.00,
      id_categoria: 3
    },

  ]
  const [id, setIDSale] = useState('')
  const [id_cliente, setIdCLient] = useState(state.cedula)
  const [id_producto, SetIdProudct] = useState('')
  const [cantidad, setCantidad] = useState('')

  const handleCreateClient = async () => {
    console.log(id_cliente)
    console.log(id_producto)
    console.log(cantidad)
    const data = {
      id_cliente: id_cliente,
      id_producto: id_producto,
      cantidad: cantidad
    }
    const dataResponse = await createVentas(data)
    console.log(dataResponse.status)
    if (dataResponse.status == 200) {
      Alert.alert('Creado correctamente', 'Se creo el cliente correctamente', [
        {
          text: 'Cerrar',
          onPress: () => navigation.goBack()
        }
      ])
    } else {
      Alert.alert('Hubo un error al crear', 'No se logro crear el cliente')
    }
  }
  return (
    <View style={styles.container}>
      <Text>Cedula Cliente</Text>
      <Input
        value={id_cliente}
        onChangeText={(text) => setIdCLient(text)}
      />
      <Picker
        selectedValue={productos[0].nombre_p}
        onValueChange={(value) => {
          SetIdProudct(value)
        }}
      >
        {
          productos.map((productos) => {
            console.log('PRODUCTOS', productos)
            return (
              <Picker.Item label={productos.nombre_p} value={productos.id} />
            )
          })
        }

      </Picker>
      <Text>Cantidad</Text>
      <Input
        onChangeText={(text) => setCantidad(text)}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>
            Regresar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleCreateClient}
        >
          <Text style={styles.buttonText}>
            Guardar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#002855',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  }
})