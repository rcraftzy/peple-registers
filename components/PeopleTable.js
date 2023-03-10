import React, { useEffect, useState } from 'react'
import { fetchPeoples } from '../services/index'
import { DataTable } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useIsFocused } from "@react-navigation/native";

const headerTable = [
  { title: "Cédula"},
  { title: "Nombres"},
  { title: "Apellido(s)"},
  { title: "Age"},
  { title: "Canton"},
  { title: "Provincia"},
]

export default function PeopleTable() {
  const [peoples, setPeoples] = useState([])
  const [error, setError] = useState(null)
  const isFocused = useIsFocused();

  useEffect(() => {
     fetchPeoples().then(([error, peoples]) => {
      if (error) return setError(error)
      setPeoples(peoples)
    })
  }, [isFocused])

  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
        {headerTable.map((header) => (
          <DataTable.Title key={header.title}>{header.title}</DataTable.Title>
        ))}
        </DataTable.Header>

        {peoples.map((people) => (
          <DataTable.Row key={people.cedula}>
            <DataTable.Cell>{people.cedula}</DataTable.Cell>
            <DataTable.Cell>{people.names}</DataTable.Cell>
            <DataTable.Cell>{people.lastName}</DataTable.Cell>
            <DataTable.Cell>{people.age}</DataTable.Cell>
            <DataTable.Cell>{people.canton}</DataTable.Cell>
            <DataTable.Cell>{people.provincia}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  )
}
const styles = StyleSheet.create({
  table: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
  },
});
