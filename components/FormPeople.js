import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { insertPeople } from '../services';

export default function FormPeople () {
  const [cedula, setCedula] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [canton, setCanton] = useState('');
  const [provincia, setProvincia] = useState('');


 const handleSubmit = async () => {
    // Verificar la conexión a Internet
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      // Si no hay conexión a Internet, almacenar los datos del formulario localmente
      const data = { cedula, nombres, apellidos, birthDate, canton, provincia };
      const formData = await AsyncStorage.getItem('formData');
      let storedData = formData ? JSON.parse(formData) : [];
      storedData = [...storedData, data];
      await AsyncStorage.setItem('formData', JSON.stringify(storedData));
      alert('Los datos del formulario se han almacenado localmente.');
      return;
    }

    // Si hay conexión a Internet, enviar los datos del formulario a la API en línea
   /*   
    const response = await fetch('https://ejemplo.com/api/formulario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cedula, nombres, apellidos, edad, canton, provincia })
    });
 */
    const [error] = await insertPeople({ birthDate, canton, lastName: apellidos, names: nombres, provincia, cedula })

    if (error) {
      // Si la respuesta es exitosa, eliminar los datos del formulario almacenados localmente
      alert('Ha ocurrido un error al enviar los datos del formulario.');
    } else {
      await AsyncStorage.removeItem('formData');
      alert('Los datos del formulario se han enviado con éxito.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Cédula</Text>
      <TextInput style={styles.input} value={cedula} onChangeText={setCedula} />

      <Text style={styles.label}>Nombres</Text>
      <TextInput style={styles.input} value={nombres} onChangeText={setNombres} />

      <Text style={styles.label}>Apellido(s)</Text>
      <TextInput style={styles.input} value={apellidos} onChangeText={setApellidos} />

      <Text style={styles.label}>Fecha de nacimiento</Text>
      <TextInput placeholder="Ejemplo: 0000-00-00" style={styles.input} value={birthDate} onChangeText={setBirthDate} />

      <Text style={styles.label}>Cantón</Text>
      <TextInput style={styles.input} value={canton} onChangeText={setCanton} />

      <Text style={styles.label}>Provincia</Text>
      <TextInput style={styles.input} value={provincia} onChangeText={setProvincia} />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height: 40,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
