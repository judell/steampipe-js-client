fetch(
  'http://localhost:8010/proxy/api/latest/org/acme/workspace/jon/query?sql=select+count(*)+from+hn_items_all', 
  { headers: { Authorization: `Bearer ${localStorage.spcToken}` } }
)
.then((response) => response.json())
.then((data) => console.log(data));

fetch(
  'http://localhost:8010/proxy/api/latest/org/acme/workspace/jon/query?sql=select+*+from+hn_items_all', 
  { headers: { Authorization: `Bearer ${localStorage.spcToken}` } }
)
.then((response) => response.json())
.then((data) => console.log(data));

