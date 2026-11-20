
import express, { Request, Response } from "express";
import cors from "cors";
import fs from "node:fs/promises";
import path from "node:path";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, "../data/db.json");

type Item = {
  id: number;
  [key: string]: unknown;
};

type Profile = {
  id: number;
  [key: string]: unknown;
};

type Database = {
  courses: Item[];
  schedule: Item[];
  grades: Item[];
  news: Item[];
  profile: Profile;
};

type Section = "courses" | "schedule" | "grades" | "news";

const sections: Section[] = [
  "courses",
  "schedule",
  "grades",
  "news"
];

async function readDB(): Promise<Database> {
  const file = await fs.readFile(dbPath, "utf8");
  return JSON.parse(file) as Database;
}

async function saveDB(data: Database): Promise<void> {
  await fs.writeFile(
    dbPath,
    JSON.stringify(data, null, 2),
    "utf8"
  );
}

// Бір уақытта келген өзгертулерді кезекпен сақтау
let writeQueue: Promise<unknown> = Promise.resolve();

function updateDB<T>(
  action: (data: Database) => Promise<T> | T
): Promise<T> {
  const task = writeQueue.then(async () => {
    const data = await readDB();
    const result = await action(data);
    await saveDB(data);
    return result;
  });

  writeQueue = task.catch(() => {});
  return task;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" &&
    value !== null &&
    !Array.isArray(value);
}

function getId(req: Request): number {
  return Number(req.params.id);
}

// Сервердің басты беті
app.get("/", (_req, res) => {
  res.json({
    message: "Universityy API жұмыс істеп тұр"
  });
});

// Барлық бөлімдерге ортақ API
sections.forEach((section) => {

  // Мәліметтерді алу
  app.get(`/api/${section}`, async (_req, res) => {
    try {
      const data = await readDB();
      res.json(data[section]);
    } catch {
      res.status(500).json({
        error: "Мәліметтерді алу мүмкін болмады"
      });
    }
  });

  // Жаңа мәлімет қосу
  app.post(`/api/${section}`, async (req, res) => {
    if (!isObject(req.body)) {
      res.status(400).json({ error: "Дұрыс JSON жіберіңіз" });
      return;
    }

    try {
      const newItem = await updateDB((data) => {
        const items = data[section];

        const nextId = Math.max(
          0,
          ...items.map((item) => item.id)
        ) + 1;

        const item: Item = {
          ...req.body,
          id: nextId
        };

        items.push(item);
        return item;
      });

      res.status(201).json(newItem);
    } catch {
      res.status(500).json({ error: "Сақтау қатесі" });
    }
  });

  // Мәліметті өзгерту
  app.put(`/api/${section}/:id`, async (req, res) => {
    const id = getId(req);

    if (!Number.isInteger(id) || !isObject(req.body)) {
      res.status(400).json({ error: "Қате деректер" });
      return;
    }

    try {
      const item = await updateDB((data) => {
        const found = data[section].find(
          (entry) => entry.id === id
        );

        if (!found) return null;

        Object.assign(found, req.body);
        found.id = id;

        return found;
      });

      if (!item) {
        res.status(404).json({ error: "Табылмады" });
        return;
      }

      res.json(item);
    } catch {
      res.status(500).json({ error: "Өзгерту қатесі" });
    }
  });

  // Мәліметті өшіру
  app.delete(`/api/${section}/:id`, async (req, res) => {
    const id = getId(req);

    if (!Number.isInteger(id)) {
      res.status(400).json({ error: "Қате ID" });
      return;
    }

    try {
      const deleted = await updateDB((data) => {
        const items = data[section];
        const index = items.findIndex(
          (item) => item.id === id
        );

        if (index === -1) return false;

        items.splice(index, 1);
        return true;
      });

      if (!deleted) {
        res.status(404).json({ error: "Табылмады" });
        return;
      }

      res.json({ message: "Сәтті өшірілді" });
    } catch {
      res.status(500).json({ error: "Өшіру қатесі" });
    }
  });
});

// Профильді алу
app.get("/api/profile", async (_req, res) => {
  try {
    const data = await readDB();
    res.json(data.profile);
  } catch {
    res.status(500).json({ error: "Профиль қатесі" });
  }
});

// Профильді жаңарту
app.put("/api/profile", async (req, res) => {
  if (!isObject(req.body)) {
    res.status(400).json({ error: "Қате деректер" });
    return;
  }

  try {
    const profile = await updateDB((data) => {
      data.profile = {
        ...data.profile,
        ...req.body,
        id: data.profile.id
      };

      return data.profile;
    });

    res.json(profile);
  } catch {
    res.status(500).json({ error: "Сақтау қатесі" });
  }
});

// Серверді қосу
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Universityy API: http://localhost:${PORT}`);
});
