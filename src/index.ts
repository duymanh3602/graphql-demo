import { app } from "@getcronit/pylon";

class StarWarsStore {
  private characters = [
    { id: 1, name: "Luke Skywalker", height: 172 },
    { id: 2, name: "Darth Vader", height: 202 },
  ];

  constructor() {
    // Bind methods in order to access `this`
    this.getCharacter = this.getCharacter.bind(this);
    this.getCharacters = this.getCharacters.bind(this);
    this.addCharacter = this.addCharacter.bind(this);
    this.deleteCharacter = this.deleteCharacter.bind(this);
  }

  getCharacter(id: number) {
    return this.characters.find((character) => character.id === id);
  }

  getCharacters() {
    return this.characters;
  }

  addCharacter(name: string, height: number) {
    const id = this.characters.length + 1;
    this.characters.push({ id, name, height });
    return { id, name, height };
  }

  deleteCharacter(id: number) {
    const character = this.getCharacter(id);
    if (character) {
      this.characters = this.characters.filter((c) => c.id !== id);
      return character;
    }
    return null;
  }
}

const store = new StarWarsStore();

export const graphql = {
  Query: {
    character: store.getCharacter,
    characters: store.getCharacters,
  },
  Mutation: {
    addCharacter: store.addCharacter,
    deleteCharacter: store.deleteCharacter,
  },
};

export default app;
