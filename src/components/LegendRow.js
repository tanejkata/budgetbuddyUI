import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LegendRow({ item, total }) {

  const percent = total
    ? ((item.value / total) * 100).toFixed(1)
    : 0;

  return (
    <View style={styles.row}>

      <View style={[styles.dot,{backgroundColor:item.color}]} />

      <Text style={styles.label}>
        {item.label}
      </Text>

      <Text style={styles.percent}>
        {percent}%
      </Text>

      <Text style={styles.amount}>
        ${item.value}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  row:{
    flexDirection:"row",
    alignItems:"center",
    paddingVertical:8
  },

  dot:{
    width:12,
    height:12,
    borderRadius:6,
    marginRight:10
  },

  label:{
    flex:1,
    fontSize:16,
    fontWeight:"600"
  },

  percent:{
    width:70,
    textAlign:"right",
    color:"#6B7280"
  },

  amount:{
    width:80,
    textAlign:"right",
    fontWeight:"700"
  }

});