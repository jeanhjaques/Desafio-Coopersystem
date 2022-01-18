import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { formatNumber } from '../lib/format';

export default function HomeScreen() {
    const [listaInvestimentos, setListaInvestimentos] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://run.mocky.io/v3/ca4ec77d-b941-4477-8a7f-95d4daf7a653')
            .then((response) => response.json())
            .then((json) => setListaInvestimentos(json.response.data))
            .catch((error) => console.error(error))
            .finally(() => console.log(listaInvestimentos));

    }, []);

    //converte string para moeda
    function converteParaMoeda(valor) {
        let valorConvertido = formatNumber(valor)
        return valorConvertido
    }

    return (
        <View style={styles.container}>
            <View style={styles.cabecalho}>
                <View>
                    <Text style={styles.titulo}>Investimentos</Text>
                </View>
                <View>
                    <Text style={styles.titulo}>R$</Text>
                </View>
            </View>
            <View>
                <FlatList
                    data={listaInvestimentos.listaInvestimentos}
                    keyExtractor={({ nome }, index) => nome}
                    renderItem={({ item }) => (
                        <Card style={ styles.card }>
                            <Card.Title title={item.nome} subtitle={item.objetivo} right={() => { return (<View style={styles.cardValor} ><Text style={styles.cardValorText}>{converteParaMoeda(item.saldoTotal)}</Text></View>) }} />
                        </Card>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cabecalho: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginVertical: 15
    },
    titulo: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: 'grey'
    },
    card: {
        marginBottom: 1
    },
    cardValor: {
        marginHorizontal: 5
    },
    cardValorText: {
        textTransform: 'uppercase',
        fontSize: 15,
        fontWeight: 'bold',
    }

})

