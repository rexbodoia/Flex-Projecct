import React from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { ClipLoader } from 'react-spinners';

class ExchangePricesPerCoinPair extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fsym: '',
      tsym: ''
    }
  }

  componentDidMount() {
    let coins = this.props.coinPair;
    this.props.fetchPrices(coins.fsym, coins.tsym, 5);
    this.props.fetchTopCoinPairs()
  }

  componentWillReceiveProps(newProps) {
    let oldCoins = this.props.coinPair;
    let newCoins = newProps.coinPair;

    if (oldCoins.fsym != newCoins.fsym || oldCoins.tsym != newCoins.tsym) {
      this.props.fetchPrices(newCoins.fsym, newCoins.tsym, 5);
    }

    const tsym = newCoins.tsym || 'USD';
    if (Object.keys(this.props.topCoins).length !== Object.keys(newProps.topCoins).length) {
      for (let i = 0; i < Object.keys(newProps.topCoins).length; i++) {
        setTimeout(() => {
          this.props.fetchPrices(newProps.topCoins[i].SYMBOL, tsym, 100)
        }, 25);
      }
    }
  }

  twoDecimalify(data) {
    return data.map(datum => {
      let obj = {};
      obj["MARKET"] = datum["MARKET"];
      obj["PRICE"] = parseFloat(datum["PRICE"].toFixed(2));
      return obj;
    });
  }

  renderChart(data) {
    if (data.length > 0) {
      return (
          <div className="container-fluid">
            <BarChart margin={{ left: 20 }} width={900} height={400} data={data}>
              <XAxis dataKey="MARKET" />
              <YAxis domain={[dataMin => (dataMin - dataMin / 500).toFixed(2), 'dataMax']} />
              <Tooltip />
              <Legend />
              <Bar dataKey="PRICE" fill="#8884d8" />
            </BarChart>
          </div>
      );
    } else {
      return (
        <div>
          <ClipLoader
            className='spinner'
            sizeUnit={"px"}
            size={70}
            color={'rgb(155, 166, 178)'}
          />
        </div>
      )
    }
  }

  render() {
    const data = this.twoDecimalify(this.props.data);
    return (
      <div>
        <div className="jumbotron jumbotron-fluid arbitrage-heading p-5">
          <h2 className="display-4">Arbitrage Opportunities</h2>
          <p className="lead" id="arbitrage-description">These are the current price differences at the top five crypto exchanges for the given currency pair. If you have an account at any two of these exchanges, theoretically you could transfer some of this currency from the exchange with the higher price to the exchange with the lower price to take advantage of an arbitrage opportunity.</p>
        </div>
        {this.renderChart(data)}
      </div>
    )
  }
}

export default ExchangePricesPerCoinPair;
