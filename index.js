class TestCustomElement extends HTMLElement {
  constructor() {
    super()
  }
async connectedCallback() {
  const data = await callSpc()

  let html = '<table>'

  // table header
  const rows = data.items
  const rowZero = rows[0]
  let rowHtml = '<tr>'
  const columns = Object.keys(rowZero)
  columns.forEach(col => {
    rowHtml += '<th>' + col + '</th>'
  })
  rowHtml += '</tr>'
  html += rowHtml

  // table body
  rows.forEach(row => {
    let rowHtml = '<tr>'
    const columns = Object.keys(row)
    columns.forEach(col => {
      rowHtml += '<td>' + row[col] + '</td>'
    })
    rowHtml += '</tr>'
    html += rowHtml
  })

  html += '</table>'

  this.innerHTML = html
  }
}

if (customElements) {
  customElements.define('test-custom-element', TestCustomElement )
}


async function callSpc() {
  //  lcp --proxyUrl https://cloud.steampipe.io
  const response = await fetch(
    'http://localhost:8010/proxy/api/latest/org/acme/workspace/jon/query?sql=select+*+from+hn_items_all+limit+3', 
    { headers: { Authorization: `Bearer ${localStorage.spcToken}` } }
  )
  
  return response.json()
}



