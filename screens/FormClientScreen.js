import { Input, Text } from '@rneui/themed'
import React, { useState } from 'react'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import { createClient } from '../services/clientServices'

export default function FormClientScreen({ navigation }) {
  const [cedula, setCedula] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [telefono, setTelefono] = useState('')
  const [direccion, setDireccion] = useState('')
  const [email, setEmail] = useState('')
  const [errores, setErrores] = useState({
    nombre: '',
    cedula: '',
    apellido: '',
    telefono: '',
    direccion: '',
    email: '',
    isValid: false
  })
  const validation = () => {
    if (!nombre) {
      setErrores((prev) => {
        return { ...prev, nombre: 'El nombre es requrido' }
      })
    } else {
      setErrores((prev) => {
        return { ...prev, nombre: '' }
      })
    }
    if (!apellido) {
      setErrores((prev) => {
        return { ...prev, apellido: 'El apellido es requrido' }
      })
    } else {
      setErrores((prev) => {
        return { ...prev, apellido: '' }
      })

    }
    if (!cedula) {
      setErrores((prev) => {
        return { ...prev, cedula: 'El cedula es requrido' }
      })
    } else if (cedula.length !== 10) {
      setErrores((prev) => {
        return { ...prev, cedula: 'La cedula debe de ser de 10 digitos' }
      })
    } else if (isNaN(parseInt(cedula))) {
      setErrores((prev) => {
        return { ...prev, cedula: 'La cedula debe de ser numerico' }
      })
    } else {
      setErrores((prev) => {
        return { ...prev, cedula: '' }
      })
    }
    if (!telefono) {
      setErrores((prev) => {
        return { ...prev, telefono: 'El telefono es requrido' }
      })
    } else if (telefono.length !== 10) {
      setErrores((prev) => {
        return { ...prev, cedula: 'La telefono debe de ser de 10 digitos' }
      })
    }
    else {
      setErrores((prev) => {
        return { ...prev, telefono: '' }
      })
    }
    if (!direccion) {
      setErrores((prev) => {
        return { ...prev, direccion: 'El direccion es requrido' }
      })
    } else {
      setErrores((prev) => {
        return { ...prev, direccion: '' }
      })
    }
    if (!email) {
      setErrores((prev) => {
        return { ...prev, email: 'El email es requrido' }
      })
    } else {
      setErrores((prev) => {
        return { ...prev, email: '' }
      })
    }
    if (nombre && apellido && cedula && telefono && direccion && email && cedula.length === 10 && telefono.length === 10) {
      setErrores((prev) => {
        return { ...prev, isValid: true }
      })
    } else {
      setErrores((prev) => {
        return { ...prev, isValid: false }
      })
    }
  }
  const handleCreateClient = async () => {
    validation()
    if (!errores.isValid) return
    const data = {
      id_cliente: cedula,
      nombre_cl: nombre,
      apellido: apellido,
      telefono: telefono,
      direccion: direccion,
      email: email
    }
    const { status } = await createClient(data)
    console.log(status)
    if (status == 200) {
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
      <Text>Cedula</Text>
      <Input
        onChangeText={(text) => setCedula(text)}
        placeholder='1729097228'
        errorStyle={{ color: 'red' }}
        errorMessage={errores.cedula}
      />
      <Text>Nombre</Text>
      <Input
        onChangeText={(text) => setNombre(text)}
        placeholder='Juan'
        errorStyle={{ color: 'red' }}
        errorMessage={errores.nombre}
      />
      <Text>Apellido</Text>
      <Input
        onChangeText={(text) => setApellido(text)}
        placeholder='Perez'
        errorStyle={{ color: 'red' }}
        errorMessage={errores.apellido}
      />
      <Text>Telefono</Text>
      <Input
        onChangeText={(text) => setTelefono(text)}
        placeholder='0980521452'
        errorStyle={{ color: 'red' }}
        errorMessage={errores.telefono}
      />
      <Text>Direccion</Text>
      <Input
        onChangeText={(text) => setDireccion(text)}
        placeholder='Av Buena vida'
        errorStyle={{ color: 'red' }}
        errorMessage={errores.direccion}
      />
      <Text>Email</Text>
      <Input
        onChangeText={(text) => setEmail(text)}
        placeholder='example@gmail.com'
        errorStyle={{ color: 'red' }}
        errorMessage={errores.email}
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