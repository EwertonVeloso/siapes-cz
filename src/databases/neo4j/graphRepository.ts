import { driver } from "../neo4j/neo4jClient.ts"; 

class GraphRepository {
  
  async createCoordinatorNode(coordinator: { id: string; name: string; email: string }) {
    const session = driver.session();
    try {
      await session.run(`
        MERGE (c:Coordinator { postgresId: $id })
        ON CREATE SET c.name = $name, c.email = $email
        ON MATCH SET c.name = $name, c.email = $email
      `, {
        id: coordinator.id,
        name: coordinator.name,
        email: coordinator.email
      });
    } finally {
      await session.close();
    }
  }

  async linkCoordinatorToInstitution(coordinatorId: string, institutionId: string, institutionName: string, coordinatorName: string) {
    const session = driver.session();
    try {
      await session.run(`
        MERGE (i:Institution { mongoId: $instId })
        ON CREATE SET i.name = $instName

        MERGE (c:Coordinator { postgresId: $coordId })
        ON CREATE SET c.name = $coordName

        MERGE (c)-[:WORKS_AT]->(i)
      `, {
        instId: institutionId,
        instName: institutionName,
        coordId: coordinatorId,
        coordName: coordinatorName
      });
    } finally {
      await session.close();
    }
  }
}

export default new GraphRepository();