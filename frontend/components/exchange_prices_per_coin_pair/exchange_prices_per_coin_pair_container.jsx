import { connect } from 'react-redux';
import ExchangePricesPerCoinPair from './exchange_prices_per_coin_pair';
import { fetchExchangePricesPerCoinPair, fetchTopCoinPairs } from '../../actions/exchange_prices_per_coin_pair_actions';

const mapStateToProps = state => ({
  coinPair: state.entities.coinPair,
  data: state.entities.exchangePricesPerCoinPair,
  topCoins: state.entities.topCoins
});

const mapDispatchToProps = dispatch => ({
  fetchPrices: (fsym, tsym, limit) => dispatch(fetchExchangePricesPerCoinPair(fsym, tsym, limit)),
  fetchTopCoinPairs: () => dispatch(fetchTopCoinPairs())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExchangePricesPerCoinPair);
