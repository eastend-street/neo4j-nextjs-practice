# Sample Next.js Project to Test Neo4j Integration

This is a sample Next.js project used to test Neo4j integration.

By leveraging Neo4j, we can represent the codebase as a graph. This allows AI-powered editors like Cursor to better understand the structure of the codebase, enabling easier and more intelligent refactoring.

# 🚀 Getting Started
Start the development server:

```bash
npm run dev
```

You’ll see a simple recipe app in your browser.
Note: This app was auto-generated by Cursor and serves only as a sample project for testing Neo4j integration.

<img width="1463" alt="Recipe App Screenshot" src="https://github.com/user-attachments/assets/9d4b1922-7b17-41f3-a62a-7b02e389295d" />


# 🧠 How to Generate the Codebase Graph
Run graph.js to insert file dependency data into your local Neo4j database and generate a JSON file (code-graph.json) representing the code structure.

Before running, update the password in graph.js to match your local Neo4j database credentials.

```bash
node graph.js
```

# 📊 How to View the Graph
To visualize the graph in the Neo4j browser, run the following Cypher query:

```cypher
MATCH (a:Component)-[:IMPORTS]->(b:Component)
RETURN a, b
```

<img width="1469" alt="Graph in Neo4j Browser" src="https://github.com/user-attachments/assets/0e713036-5fac-41d2-9ac5-e13f8260b7b1" />


You can also inspect the graph data in JSON format (code-graph.json):  

<img width="1078" alt="Graph JSON Output" src="https://github.com/user-attachments/assets/df0958b1-8fa0-4a03-8c73-b8101b23c938" />


# ✍️ Author
https://github.com/eastend-street
