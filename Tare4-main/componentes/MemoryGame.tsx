import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ImageBackground, Text } from 'react-native';

// Importa las imágenes necesarias
import imagen1 from '../imagenes/card1.png';
import imagen3 from '../imagenes/card2.png';
import imagen5 from '../imagenes/card3.png';
import imagen7 from '../imagenes/card4.png';
import imagen9 from '../imagenes/card5.png';
import imagen11 from '../imagenes/card6.png';

const images = [
  imagen1,
  imagen3,
  imagen5,
  imagen7,
  imagen9,
  imagen11,
];

const numPairs = 6; 
const numColumns = 3; 
const numRows = 4; 
const numCards = numPairs * 2; 
const maxMoves = 10; 


const createBoard = () => {
  const selectedImages = images.slice(0, numPairs);
  const duplicatedImages = [...selectedImages, ...selectedImages];
  const shuffledImages = duplicatedImages.sort(() => Math.random() - 0.5);
  return shuffledImages.map((image, index) => ({
    id: index,
    src: image,
    isFlipped: false,
    isMatched: false,
  }));
};

const MemoryGame = () => {
  const [board, setBoard] = useState(createBoard());
  const [selected, setSelected] = useState<number[]>([]);
  const [currentMoves, setCurrentMoves] = useState(0);


  const resetGame = () => {
    setBoard(createBoard());
    setSelected([]);
    setCurrentMoves(0);
  };

  const handleCardPress = (index: number) => {
    if (currentMoves >= maxMoves) {
 
      resetGame();
      return;
    }

    setCurrentMoves((prevMoves) => prevMoves + 1);

    if (selected.length === 2) {
      return;
    }

    const newBoard = board.map((card) =>
      card.id === index ? { ...card, isFlipped: true } : card
    );

    if (selected.length === 1) {

      if (newBoard[selected[0]].src === newBoard[index].src) {
        newBoard[selected[0]].isMatched = true;
        newBoard[index].isMatched = true;
      } else {
  
        setTimeout(() => {
          newBoard[selected[0]].isFlipped = false;
          newBoard[index].isFlipped = false;
          setBoard(newBoard);
        }, 1000);
      }
      setSelected([]);
    } else {
      setSelected([index]);
    }

    setBoard(newBoard);
  };

  return (
    <ImageBackground
      source={require('../imagenes/fondo.png')}
      style={styles.background}
      imageStyle={{ resizeMode: 'cover' }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>Movimientos: {currentMoves}/{maxMoves}</Text>
        </View>
        <View style={styles.board}>
          {[...Array(numRows)].map((_, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {[...Array(numColumns)].map((_, colIndex) => {
                const cardIndex = rowIndex * numColumns + colIndex;
                const card = board[cardIndex];
                return (
                  <TouchableOpacity
                    key={cardIndex}
                    style={styles.card}
                    onPress={() => handleCardPress(cardIndex)}
                    disabled={card.isFlipped || card.isMatched}
                  >
                    <Image
                      source={card.isFlipped || card.isMatched ? card.src : require('../imagenes/imagen-back.png')}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
        <TouchableOpacity onPress={resetGame} style={styles.button}>
          <Text style={styles.buttonText}>Reiniciar Juego</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20, 
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
    borderRadius: 10, 
    padding: 20, 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  text: {
    fontSize: 15,
    color: '#fff',
  },
  board: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  card: {
    width: 100,
    height: 150,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  button: {
    marginTop: 1,
    width: 200,
    height: 50,
    backgroundColor: '#913433',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MemoryGame;
