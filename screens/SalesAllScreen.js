
import { FAB } from "@rneui/themed";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";

import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import { getVentas } from "../services/salesAllService";

export const SalesList = ({ navigation }) => {

  useEffect(() => {
    getAllSales();
  }, [])

  const getAllSales = async () => {
    try {
      let dataSales = await getVentas();
      setDataVentasList(dataSales);
    } catch (error) {
      console.log(error)
    }
  }

  const [dataSalesList, setDataVentasList] = useState();


  const ItemListSales = ({ item }) => {
    return (<View style={{ flexDirection: 'row', flex: 1, borderWidth: 1, paddingVertical: 10, margin: 5, borderRadius: 4, backgroundColor: '#33415C' }}>
      <TouchableHighlight style={{ flex: 8 }} onPress={() => {
        navigation.navigate("ClientForm", { cedula: item.id_cliente })
      }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}  >
            <Text style={styles.text}> {item.fecha_compra}</Text>
          </View>

          <View style={{ flex: 2 }}  >
            <Text style={styles.text}>{item.nombre_cl} {item.total}</Text>
          </View>
        </View>
      </TouchableHighlight>

      <TouchableHighlight style={{ flex: 2 }}>
        <View>
          <Icon
            name="shopping-cart"
            type='Feather'
            size={20}
            color='white'
          />
        </View>
      </TouchableHighlight>


    </View>

    )


  }


  return (<View>

    <View>
      <FlatList
        data={dataSalesList}
        renderItem={({ item }) => {
          return (<ItemListSales
            item={item}
          />)
        }}
        keyExtractor={(item) => (item.id)}


      />
    </View>
    <FAB
      color="#002855"
      title={'NUEVOOOO'}
      onPress={() => navigation.navigate('ClientForm')}
      style={{ justifyContent: 'flex-end', paddingHorizontal: 12, paddingTop: 550 }}
    />
  </View>)

}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightblue",
  },
  text: {
    color: 'white',
    fontSize: 15
  }
});
