class TestCustomElement extends HTMLElement {
  constructor() {
    super()
  }
async connectedCallback() {
  const data = await callSpc()
  let html = '<table>'
  const rows = data.items
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



