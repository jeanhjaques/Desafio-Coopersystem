import { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { Modal } from 'react-native-paper';
import CurrencyInput from 'react-native-currency-input';
import { useForm, Controller } from 'react-hook-form';

//componentes ou libs
import { formatNumber } from '../lib/format';

export default function ResgatePersonalizado({ navigation, route }) {
    const [listaAcoes, setListaAcoes] = useState([]);

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm()

    //recebe uma variável e verifica se é um número
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    //configurações dos modais
    const [visibilidadeModalErro, setVisibilidadeModalErro] = useState(false);
    const [visibilidadeModalSucesso, setVisibilidadeModalSucesso] = useState(false)
    const showModalErro = () => setVisibilidadeModalErro(true);
    const hideModalErro = () => setVisibilidadeModalErro(false);
    const showModalSucesso = () => setVisibilidadeModalSucesso(true);
    const hideModalSucesso = () => setVisibilidadeModalSucesso(false);

    //verifica se algum campo passou do valor máximo e exibe o modal adequado
    //não está funcionando 100% devido a uma falha de sincronismo que ainda preciso tratar
    const [listaErros, setListaErros] = useState("");

    async function onSubmit(data) {
        const erros = await verificarErros(data);
        if(erros.length == 0){
            console.log("nenhum erro")
            showModalSucesso()
        }
        else{
            setListaErros(erros)
            showModalErro()
        }
    }

    async function verificarErros(data){
        let listaErrosTemp = []
        for (let item of route.params.listaAcoes) {
            if (parseFloat(data[item.id]) > parseFloat(route.params.saldoTotal * (item.percentual / 100))) {
                const objetoErro = {
                    "idAcao": item.id,
                    "nome": item.nome,
                    "valorMaximo": converteParaMoeda(route.params.saldoTotal * (item.percentual / 100))
                }
                listaErrosTemp.push(objetoErro)
            }
        }
        return listaErrosTemp;
    }

    const onChange = arg => {
        return {
            value: arg.nativeEvent.text,
        };
    };

    useEffect(() => {
        for (let item of route.params.listaAcoes) {
            register(item.id)
        }
    }, [register])

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
                                <Text style={styles.informacaoConteudo}>{converteParaMoeda(route.params.saldoTotal * (item.percentual / 100))}</Text>
                            </View>
                            <View style={styles.conteudo}>
                                <Text style={styles.informacaoConteudo}>Valor a resgatar</Text>
                            </View>
                            <View>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CurrencyInput
                                            style={styles.input}
                                            mode="focused"
                                            color='white'
                                            prefix="R$"
                                            label="Valor a resgatar"
                                            value={value}
                                            minValue={0}
                                            maxValue={parseFloat(route.params.saldoTotal * (item.percentual / 100))}
                                            onChangeValue={onChange}
                                            style={styles.input}
                                        ></CurrencyInput>

                                    )}
                                    name={item.id}
                                    rules={{}}
                                />
                            </View>
                        </View>
                    )}
                />
            </View>
            <View>
                <Button title='Resgatar' onPress={handleSubmit(onSubmit)}>Resgatar</Button>
            </View>
            <Modal visible={visibilidadeModalErro} onDismiss={hideModalErro} contentContainerStyle={styles.containerModal}>
                <Text style={styles.tituloModal}>Dados Invalidos</Text>
                <Text style={styles.subtituloModal}>Você preencheu um ou mais campos com valor acima do permitido:</Text>
                <FlatList
                    data={listaErros}
                    keyExtractor={({ nome }, index) => nome}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={styles.conteudoModal}>{item.nome}: Valor Máximo de R$ {item.valorMaximo}</Text>
                        </View>
                        )}                
                     />
                <Button color='red' title='Corrigir' onPress={hideModalErro}></Button>
            </Modal>
            <Modal visible={visibilidadeModalSucesso} onDismiss={hideModalSucesso} contentContainerStyle={styles.containerModal}>
                <Text style={styles.tituloModal}>Resgate Efetuado!</Text>
                <Text style={styles.conteudoModal}>O valor solicitado estará em sua conta em sua conta em até 5 dias úteis!</Text>
                <Button title='Novo Resgate' onPress={() => navigation.navigate('Home')}></Button>
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
        marginBottom: 50,
        flex: 1
    },
    input: {
        backgroundColor: 'white',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        paddingHorizontal: 15,
        paddingVertical: 5
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
    subtituloModal: {
        fontWeight: 'bold',
        fontSize: 14,
        marginHorizontal: 15,
        textAlign: 'center',
        padding: 5,
    },
    conteudoModal: {
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center',
    }
})
