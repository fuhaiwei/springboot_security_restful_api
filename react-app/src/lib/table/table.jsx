import React from 'react'
import './table.css'

export class Table extends React.Component {

  render() {
    return (
      <div className="table-root">
        {this.props.title && (
          <div className="table-title">
            {this.props.title}
          </div>
        )}
        <table className="table table-striped table-bordered table-hover">
          <thead>
          <tr>
            {this.props.columns.map(c => (
              <th key={c.key} className={c.key}>{c.title}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {this.props.rows.map(t => (
            <tr key={t.id}>
              {this.props.columns.map(c => (
                <td key={c.key} className={c.key}>{c.format(t)}</td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    )
  }

}
