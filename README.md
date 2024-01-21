<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RESTful API Documentation</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      margin: 2em;
    }

    h1, h2, h3, h4, h5 {
      color: #333;
    }

    code {
      background-color: #f4f4f4;
      padding: 2px 4px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    pre {
      background-color: #f4f4f4;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow-x: auto;
    }
  </style>
</head>

<body>

  <h1>Sample RESTful API Documentation</h1>

  <h2>Table of Contents</h2>
  <ul>
    <li><a href="#introduction">Introduction</a></li>
    <li><a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#api-documentation">API Documentation</a>
      <ul>
        <li><a href="#authentication">Authentication</a></li>
        <li><a href="#endpoints">Endpoints</a>
          <ul>
            <li><a href="#1-get-all-resources">1. Get All Resources</a></li>
            <li><a href="#2-get-a-single-resource">2. Get a Single Resource</a></li>
            <li><a href="#3-create-a-resource">3. Create a Resource</a></li>
            <li><a href="#4-update-a-resource">4. Update a Resource</a></li>
            <li><a href="#5-delete-a-resource">5. Delete a Resource</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li><a href="#examples">Examples</a></li>
    <li><a href="#error-handling">Error Handling</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ul>

  <h2 id="introduction">Introduction</h2>
  <p>Welcome to the Sample RESTful API! This API provides endpoints for managing resources and can be used in various applications.</p>

  <h2 id="getting-started">Getting Started</h2>

  <h3 id="prerequisites">Prerequisites</h3>
  <ul>
    <li>Node.js installed</li>
    <li>MongoDB or another database of your choice</li>
  </ul>

  <h3 id="installation">Installation</h3>
  <ol>
    <li>Clone the repository:
      <pre><code>git clone https://github.com/yourusername/sample-rest-api.git</code></pre>
    </li>
    <li>Install dependencies:
      <pre><code>cd sample-rest-api
npm install</code></pre>
    </li>
    <li>Configure environment variables:
      <p>Create a <code>.env</code> file and provide the necessary configuration, including database connection details and authentication secrets.</p>
    </li>
    <li>Start the server:
      <pre><code>npm start</code></pre>
    </li>
  </ol>

  <h2 id="api-documentation">API Documentation</h2>

  <h3 id="authentication">Authentication</h3>
  <p>To access certain endpoints, you may need to include an API key or token in the request headers.</p>

  <h3 id="endpoints">Endpoints</h3>

  <h4 id="1-get-all-resources">1. Get All 
