const DB_NAME = "clientesDB";
const STORE_NAME = "clientes";

// Función para inicializar la base de datos
async function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => reject("Error al abrir la base de datos");

    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "NIT" });
      }
    };
  });
}

// Función para agregar cliente
export async function addClient(client: {
  name: string;
  NIT: string;
  phone: string;
  activity: string;
  direction: string;
  municipality: string;
  province: string;
  RC05: string;
  obligations: { name: string; paragraph: string }[];
  spends: any[];
  revenues: any[];
}): Promise<string> {
  try {
    const db = await initDB();
    const tr = db.transaction(STORE_NAME, "readwrite");
    const store = tr.objectStore(STORE_NAME);

    // Verificar si el cliente existe
    const existingClient = await new Promise((resolve) => {
      const request = store.get(client.NIT);
      request.onsuccess = () => resolve(request.result);
    });

    if (existingClient) {
      return "NIT ya existente";
    }

    // Agregar el nuevo cliente
    await new Promise((resolve, reject) => {
      const request = store.add(client);
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject("Error al agregar cliente");
    });

    return "Cliente creado con exito";
  } catch (error) {
    console.error("Error al agregar cliente:", error);
    return "Error al crear cliente";
  }
}

// Función para obtener todos los clientes
export async function getClients() {
  try {
    const db = await initDB();
    const tr = db.transaction(STORE_NAME, "readonly");
    const store = tr.objectStore(STORE_NAME);

    return new Promise((resolve) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
    });
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    return [];
  }
}

// Función para encontrar un cliente por NIT
export async function findClient(NIT: string) {
  try {
    const db = await initDB();
    const tr = db.transaction(STORE_NAME, "readonly");
    const store = tr.objectStore(STORE_NAME);

    return new Promise((resolve) => {
      const request = store.get(NIT);
      request.onsuccess = () => resolve(request.result);
    });
  } catch (error) {
    console.error("Error al buscar cliente:", error);
    return null;
  }
}

// Función para agregar ingreso a un cliente
export async function addRevenue(
  NIT: string,
  revenue: {
    amount: number;
    day: number;
    month: string;
    year: number;
    details: string;
  }
): Promise<string> {
  try {
    const db = await initDB();
    const tr = db.transaction(STORE_NAME, "readwrite");
    const store = tr.objectStore(STORE_NAME);

    // Obtener el cliente actual
    const client = await new Promise((resolve) => {
      const request = store.get(NIT);
      request.onsuccess = () => resolve(request.result);
    });

    if (!client) {
      return "Cliente no encontrado";
    }

    // Agregar el nuevo ingreso con fecha
    const updatedClient = {
      ...client,
      revenues: [...client.revenues, revenue],
    };

    // Actualizar el cliente en la base de datos
    await new Promise((resolve, reject) => {
      const request = store.put(updatedClient);
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject("Error al actualizar cliente");
    });

    return "Ingreso agregado con éxito";
  } catch (error) {
    console.error("Error al agregar ingreso:", error);
    return "Error al agregar ingreso";
  }
}

export async function addSpend(
  NIT: string,
  spend: {
    amount: number;
    day: number;
    month: string;
    year: number;
    type: string;
  }
): Promise<string> {
  try {
    const db = await initDB();
    const tr = db.transaction(STORE_NAME, "readwrite");
    const store = tr.objectStore(STORE_NAME);

    // Obtener el cliente actual
    const client = await new Promise((resolve) => {
      const request = store.get(NIT);
      request.onsuccess = () => resolve(request.result);
    });

    if (!client) {
      return "Cliente no encontrado";
    }

    // Agregar el nuevo ingreso con fecha
    const updatedClient = {
      ...client,
      spends: [...client.spends, spend],
    };

    // Actualizar el cliente en la base de datos
    await new Promise((resolve, reject) => {
      const request = store.put(updatedClient);
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject("Error al actualizar cliente");
    });

    return "Gasto agregado con éxito";
  } catch (error) {
    console.error("Error al agregar gasto:", error);
    return "Error al agregar gasto";
  }
}

export async function editSpend(
  NIT: string,
  spendIndex: number,
  updatedSpend: {
    amount: number;
    day: number;
    month: string;
    year: number;
    type: string;
  }
): Promise<string> {
  try {
    const db = await initDB();
    const tr = db.transaction(STORE_NAME, "readwrite");
    const store = tr.objectStore(STORE_NAME);

    // Obtener el cliente actual
    const client = await new Promise((resolve) => {
      const request = store.get(NIT);
      request.onsuccess = () => resolve(request.result);
    });

    if (!client) {
      return "Cliente no encontrado";
    }

    // Verificar si el índice es válido
    if (spendIndex < 0 || spendIndex >= client.spends.length) {
      return "Índice de gasto no válido";
    }

    // Crear nueva lista de gastos con el gasto actualizado
    const updatedSpends = [...client.spends];
    updatedSpends[spendIndex] = updatedSpend;

    // Actualizar el cliente con la lista de gastos modificada
    const updatedClient = {
      ...client,
      spends: updatedSpends,
    };

    // Actualizar el cliente en la base de datos
    await new Promise((resolve, reject) => {
      const request = store.put(updatedClient);
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject("Error al actualizar cliente");
    });

    return "Gasto actualizado con éxito";
  } catch (error) {
    console.error("Error al editar gasto:", error);
    return "Error al editar gasto";
  }
}

export async function deleteSpend(
  NIT: string,
  spendIndex: number
): Promise<string> {
  try {
    const db = await initDB();
    const tr = db.transaction(STORE_NAME, "readwrite");
    const store = tr.objectStore(STORE_NAME);

    // Obtener el cliente actual
    const client = await new Promise((resolve) => {
      const request = store.get(NIT);
      request.onsuccess = () => resolve(request.result);
    });

    if (!client) {
      return "Cliente no encontrado";
    }

    // Verificar si el índice es válido
    if (spendIndex < 0 || spendIndex >= client.spends.length) {
      return "Índice de gasto no válido";
    }

    // Crear nueva lista de gastos sin el gasto a eliminar
    const updatedSpends = client.spends.filter(
      (_, index) => index !== spendIndex
    );

    // Actualizar el cliente con la lista de gastos modificada
    const updatedClient = {
      ...client,
      spends: updatedSpends,
    };

    // Actualizar el cliente en la base de datos
    await new Promise((resolve, reject) => {
      const request = store.put(updatedClient);
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject("Error al actualizar cliente");
    });

    return "Gasto eliminado con éxito";
  } catch (error) {
    console.error("Error al eliminar gasto:", error);
    return "Error al eliminar gasto";
  }
}

export const updateClient = async (client: any) => {
  const db = await initDB();
  try {
    const tr = db.transaction(STORE_NAME, "readwrite");
    const store = tr.objectStore(STORE_NAME);
    await store.put(client);
    return true;
  } catch (error) {
    console.error("Error actualizando cliente:", error);
    return false;
  }
};
