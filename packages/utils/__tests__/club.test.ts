import { describe, it, expect } from "vitest";
import {
  getAllClubs,
  getClubBySlug,
  getClubsByCategory,
} from "../dist/index.mjs";

describe("getClubById", () => {
  it("should return the correct club for a valid ID", () => {
    const club = getClubBySlug("cerezo");
    expect(club).toBeDefined();
    expect(club?.name).toBe("セレッソ大阪");
  });

  it("should return undefined for an invalid ID", () => {
    const club = getClubBySlug("invalid-id");
    expect(club).toBeUndefined();
  });
});

describe("getClubsByCategory", () => {
  ["J1", "J2", "J3"].forEach((category) => {
    it("should return clubs for a valid category", () => {
      const clubs = getClubsByCategory(category);
      expect(clubs.length).toBeGreaterThan(0);
      expect(clubs.length).toEqual(20);
      expect(clubs.every((club) => club.category === category)).toBe(true);
    });
  });

  it("should return an empty array for an invalid category", () => {
    const clubs = getClubsByCategory("others");
    expect(clubs.length).toEqual(3);
  });
});

describe("getAllClubs", () => {
  it("should return all clubs", () => {
    const clubs = getAllClubs();
    expect(clubs.length).toBeGreaterThan(0);
    expect(clubs.length).toBeGreaterThan(60);
  });
});
