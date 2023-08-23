import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

export type Props = {
  name: string;
  baseEnthusiasmLevel?: number;
};

const Block: React.FC<Props> = (
) => {
  return (
      <View style={blockStyles} {...props}>
      {children}
      </View>
      )

};


export default Block;
