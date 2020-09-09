import React, { useState } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

const App = () => {

  const [gridApi, setGridApi] = useState();

  const columnDefs = [{
    headerName: "Make", field: "make", sortable: true, filter: true, checkboxSelection: true
  }, {
    headerName: "Model", field: "model", 
  }, {
    headerName: "Price", field: "price"
  }];

  const rowData = [{
    orgHierarchy: ['PELI123'], make: "Toyota", model: "Celica", price: 35000
  }, {
    orgHierarchy: ['PELI123', 'Draft'], make: "Ford", model: "Mondeo", price: 32000
  }, {
    orgHierarchy: ['LC', 'KN'], make: "Porsche", model: "Boxter", price: 72000
  }, {
    orgHierarchy: ['Erica Rogers', 'KYC'], make: "Mercedes", model: "Mondeo", price: 32000 
  }
];

  const autoGroupColumnDef = {
    headerName: "Organization",
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      checkbox: true
    }
  };

  
  const handleGridReady = (params) => {
    setGridApi(params.api)
  }

  const handleButtonClick = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    console.log("Selected Nodes", selectedNodes);
    const data = selectedNodes.map((node) => node.data);
    console.log("Data> ", data);
  }

  const getDataPath = (data)=> {
      return data.orgHierarchy;
  }

  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: '250px',
        width: '600px'
      }}
    >
      <AgGridReact
        onGridReady={handleGridReady}
        rowSelection="multiple"
        columnDefs={columnDefs}
        groupSelectsChildren={true}
        treeData={true  }
        autoGroupColumnDef={autoGroupColumnDef}
        getDataPath={getDataPath}
        rowData={rowData}>
      </AgGridReact>
      <button onClick={handleButtonClick}>Export Data</button>
    </div>
  );
}

export default App;