import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

//componentes ou libs
import { formatNumber } from '../../lib/format';

export default function CardListaInvestimentos(props) {
    //converte string para moeda
    function converteParaMoeda(valor) {
        let valorConvertido = formatNumber(valor)
        return valorConvertido
    }

    return (
        <Card style={styles.card}>
            <Card.Title
                title={props.nome}
                subtitle={props.subtitulo}
                right={() => {
                    return (
                        <View style={styles.cardValor} >
                            <Text style={styles.cardValorText}>{converteParaMoeda(props.valor)}</Text>
                        </View>
                    )
                }}
            />
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 1
    },
    cardValor: {
        marginHorizontal: 15
    },
    cardValorText: {
        textTransform: 'uppercase',
        fontSize: 15,
        fontWeight: 'bold'
    }
})