import { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

//componentes ou libs
import CardListaInvestimentos from './components/CardListaInvestimentos'


export default function HomeScreen({ navigation }) {
    const [listaInvestimentos, setListaInvestimentos] = useState([])
    const [loading, setLoading] = useState(true);

    useLayoutEffect(() => {
        fetch('https://run.mocky.io/v3/ca4ec77d-b941-4477-8a7f-95d4daf7a653')
            .then((response) => response.json())
            .then((json) => setListaInvestimentos(json.response.data))
            .catch((error) => console.error(error))
    }, []);

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
                        <TouchableOpacity onPress={() => navigation.navigate('Resgate Personalizado', { listaAcoes: item.acoes, nome: item.nome, saldoTotal: item.saldoTotal })}>
                            <CardListaInvestimentos nome={item.nome} subtitulo={item.objetivo} valor={item.saldoTotal} />
                        </TouchableOpacity>
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
    }
})

