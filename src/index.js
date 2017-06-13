import React from 'react';
import ReactDOM from 'react-dom';
import t from 'tcomb-form';
import './style.css';

const Form = t.form.Form;

const Items =  t.list(t.struct({
  title: t.String,
}));

function ItemsTemplate({ items, add }) {
  return (
    <div>
      {items.map(item => (
        <div key={item.key} className="item">
          {item.input}

          Index provided by list template:
          <code>
            {item.input.props.ctx.path}
          </code>
          
          <br />
          <button onClick={item.buttons[0].click}>
            Remove
          </button>
        </div>
      ))}
      <button onClick={add.click}>
        Add item
      </button>
    </div>
  );
} 

class SingleItemFactory extends t.form.Textbox {
  render() {
    const textboxElement = super.render();

    return (
      <div>
        {textboxElement}
        
        Actual component path: 
        <code>
          {this.props.ctx.path.join('.')}
        </code>
      </div>
    );
  }
}

const OPTIONS = {
  template: ItemsTemplate,
  item: {
    fields: {
      title: {
        factory: SingleItemFactory,
      }
    }
  }
};

class App extends React.Component {
  state = {
    value: [],
    lastChangedComponentPath: '',
  };

  handleChange = (value, path) => {
    this.setState({ 
      lastChangedComponentPath: path.join('.'),
      value,
    });
  }

  render() {
    const { value, lastChangedComponentPath } = this.state;

    return (
      <div>
        <Form type={Items} options={OPTIONS} onChange={this.handleChange} value={value} />
        {Boolean(lastChangedComponentPath) && (
          <article>
            Last changed component path:
            <code>
              {this.state.lastChangedComponentPath}
            </code>
          </article>
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
