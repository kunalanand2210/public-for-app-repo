import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';



const MainScreen = () => {
  return (
    <ScrollView>
      <SafeAreaView>
        <View style={{

        }}>
          <Card>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Content>
              <Title>Our Products </Title>
              <Paragraph>Click to explore more</Paragraph>
            </Card.Content>
          </Card>

          <Card >
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Content>
              <Title>Services Page  </Title>
              <Paragraph>Click to go with Our Services</Paragraph>
            </Card.Content>
          </Card>
        
        </View>

      </SafeAreaView>
    </ScrollView>

  )
}

export default MainScreen

const styles = StyleSheet.create({})