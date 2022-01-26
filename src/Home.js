import { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';
import { Modal } from 'react-native-paper'

//componentes ou libs
import CardListaInvestimentos from './components/CardListaInvestimentos'


export default function HomeScreen({ navigation }) {
    const [listaInvestimentos, setListaInvestimentos] = useState([])
    const [visibilidadeModalCarencia, setVisibilidadeModalCarencia] = useState(false);
    const showModalCarencia = () => setVisibilidadeModalCarencia(true);
    const hideModalCarencia = () => setVisibilidadeModalCarencia(false);



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
                        <TouchableOpacity onPress={item.indicadorCarencia == "N" ? () => navigation.navigate('Resgate Personalizado', { listaAcoes: item.acoes, nome: item.nome, saldoTotal: item.saldoTotal }) : () => showModalCarencia()}>
                            <CardListaInvestimentos nome={item.nome} subtitulo={item.objetivo} valor={item.saldoTotal} />
                        </TouchableOpacity>
                    )}
                />
            </View>
            <Modal visible={visibilidadeModalCarencia} onDismiss={hideModalCarencia} contentContainerStyle={styles.containerModal}>
                    <Text style={styles.tituloModal}>Esse fundo de investimento está em carência</Text>
                    <Button color='red' title='Voltar' onPress={hideModalCarencia}></Button>
            </Modal>
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
    containerModal: {
        backgroundColor: 'white',
        padding: 10,
        margin: 15
    },
    tituloModal: {
        fontWeight: 'bold',
        fontSize: 16,
        marginHorizontal: 15,
        textTransform: 'uppercase',
        textAlign: 'center',
        padding: 5,
    },
})
