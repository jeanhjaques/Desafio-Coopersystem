import { useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, Button } from 'react-native';
import { TextInput, Modal } from 'react-native-paper';
import CurrencyInput from 'react-native-currency-input';




//componentes ou libs
import { formatNumber } from '../lib/format';

export default function ResgatePersonalizado({ navigation, route }) {
    const [listaAcoes, setListaAcoes] = useState([]);
    const [valorResgate, setValorResgate] = useState(0);

    //configurações dos modais
    const [visibilidadeModalErro, setVisibilidadeModalErro] = useState(false);
    const showModalErro = () => setVisibilidadeModalErro(true);
    const hideModalErro = () => setVisibilidadeModalErro(false);

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
                        <View style={styles.conteudo}>
                            <Text style={styles.informacaoConteudo}>Valor a resgatar</Text>
                        </View>
                        <View>
                            <CurrencyInput error={parseFloat(valorResgate) > parseFloat(route.params.saldoTotal*(item.percentual/100)) } style={styles.input} mode="focused" color='white' prefix="R$" label="Valor a resgatar" value={valorResgate} onChangeValue={valorResgate => setValorResgate(valorResgate)} style={styles.input}   
                            ></CurrencyInput>
                        </View>
                    </View>
                )}
                />
            </View>
            <View>
                <Button title='Resgatar' onPress={showModalErro}>Resgatar</Button>
            </View>
            <Modal visible={visibilidadeModalErro} onDismiss={hideModalErro} contentContainerStyle={styles.containerModal}>
                    <Text style={styles.tituloModal}>Dados Invalidos</Text>
                    <Text style={styles.conteudoModal}>Você preencheu um ou mais campos com valores fora dos permitidos</Text>
                    <Button title='Corrigir' onPress={hideModalErro}></Button>
                </Modal>
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
        backgroundColor: 'white',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        marginHorizontal: 15
    },
    containerModal:{
        backgroundColor: 'white', 
        padding: 20, 
        marginHorizontal: 15
    },
    tituloModal:{
        fontWeight: 'bold',
        fontSize: 16,
        marginHorizontal: 15,
        textTransform: 'uppercase',
        textAlign: 'center',
        padding: 5,
    },
    conteudoModal:{
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 14,
        marginHorizontal: 15,
        textAlign: 'center',
        padding: 15,
    }
})
