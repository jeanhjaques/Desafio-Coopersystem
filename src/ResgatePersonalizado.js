import { useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, Button } from 'react-native';
import { TextInput } from 'react-native-paper';


//componentes ou libs
import { formatNumber } from '../lib/format';

export default function ResgatePersonalizado({ navigation, route }) {
    const [listaAcoes, setListaAcoes] = useState([]);
    const [valorResgate, setValorResgate] = useState(0);

    useLayoutEffect(() => {
        setListaAcoes(route.params.listaAcoes)
    }, []);

    //converte string para moeda
    function converteParaMoeda(valor) {
        let valorConvertido = formatNumber(valor)
        return valorConvertido
    }


    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.titulo}>Dados do investimento</Text>
                <View style={styles.conteudo}>
                    <Text style={styles.tituloConteudo}>Nome</Text>
                    <Text style={styles.informacaoConteudo}>{route.params.nome}</Text>
                </View>
                <View style={styles.conteudo}>
                    <Text style={styles.tituloConteudo}>Saldo Total Disponível</Text>
                    <Text style={styles.informacaoConteudo}>{converteParaMoeda(route.params.saldoTotal)}</Text>
                </View>

                <Text style={styles.titulo}>Resgate do seu jeito</Text>
                <FlatList
                data={listaAcoes}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                    <View style={styles.blocoAcao}>
                        <View style={styles.conteudo}>
                            <Text style={styles.tituloConteudo}>Ação</Text>
                            <Text style={styles.informacaoConteudo}>{item.nome}</Text>
                        </View>
                        <View style={styles.conteudo}>
                            <Text style={styles.tituloConteudo}>Saldo Total Disponível</Text>
                            <Text style={styles.informacaoConteudo}>{converteParaMoeda(route.params.saldoTotal*(item.percentual/100))}</Text>
                        </View>
                        <View>
                            <TextInput style={styles.input} mode="focused" color='white' label="Valor a resgatar" onChangeText={setValorResgate} style={styles.input}></TextInput>
                        </View>
                    </View>
                )}
                />
            </View>
            <View>
                <Button title='Resgatar'>Resgatar</Button>
            </View>
        </View>
    )
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
        color: 'grey',
        margin: 15
    },
    conteudo: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 1
    },
    tituloConteudo: {
        fontWeight: 'bold',
        fontSize: 16
    },
    informacaoConteudo: {
        fontWeight: 'bold',
        fontSize: 14,
        color: 'grey'
    },
    blocoAcao: {
        marginBottom: 5,
    },
    input:{
        backgroundColor: 'white'
    }
})
