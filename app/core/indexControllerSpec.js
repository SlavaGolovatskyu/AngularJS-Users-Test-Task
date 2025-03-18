"use strict";

describe("IndexController", function () {
  let log, location, usersService, controller, httpBackend, vm;

  beforeEach(module("app.index"));
  beforeEach(module("app.usersService"));

  beforeEach(inject(function ($controller, $httpBackend, _usersService_, $log, $location) {
    location = $location;
    log = $log;
    usersService = _usersService_;
    httpBackend = $httpBackend;
    controller = $controller("IndexController", {});
    vm = controller;
  })); 

  it("should be defined", function () {
    expect(controller).toBeDefined();
  });

  it("should contain users list - HTTP 200", function () {
    httpBackend.expectGET("assets/data/users.json").respond(
      [
        { "username": "jdoe1990", "firstName": "John", "lastName": "Doe", "email": "johndoe@mail.com", "type": "User" },
        { "username": "asmith1985", "firstName": "Alice", "lastName": "Smith", "email": "alice.smith@mail.com", "type": "User" },
        { "username": "bwilson92", "firstName": "Bob", "lastName": "Wilson", "email": "bob.wilson@mail.com", "type": "Administrator" },
        { "username": "cjohnson88", "firstName": "Charlie", "lastName": "Johnson", "email": "charlie.j@mail.com", "type": "User" },
        { "username": "dthomas79", "firstName": "David", "lastName": "Thomas", "email": "david.t@mail.com", "type": "Moderator" },
        { "username": "ejackson81", "firstName": "Emma", "lastName": "Jackson", "email": "emma.j@mail.com", "type": "User" },
        { "username": "fanderson87", "firstName": "Frank", "lastName": "Anderson", "email": "frank.a@mail.com", "type": "User" },
        { "username": "gwhite93", "firstName": "Grace", "lastName": "White", "email": "grace.w@mail.com", "type": "Administrator" },
        { "username": "hhall76", "firstName": "Hannah", "lastName": "Hall", "email": "hannah.h@mail.com", "type": "User" },
        { "username": "ijames90", "firstName": "Isaac", "lastName": "James", "email": "isaac.j@mail.com", "type": "User" },
        { "username": "jkent95", "firstName": "Jack", "lastName": "Kent", "email": "jack.k@mail.com", "type": "Moderator" },
        { "username": "kmiller89", "firstName": "Karen", "lastName": "Miller", "email": "karen.m@mail.com", "type": "User" },
        { "username": "lmartin86", "firstName": "Luke", "lastName": "Martin", "email": "luke.m@mail.com", "type": "User" },
        { "username": "mmorris77", "firstName": "Megan", "lastName": "Morris", "email": "megan.m@mail.com", "type": "Administrator" },
        { "username": "nroberts82", "firstName": "Noah", "lastName": "Roberts", "email": "noah.r@mail.com", "type": "User" },
        { "username": "owright84", "firstName": "Olivia", "lastName": "Wright", "email": "olivia.w@mail.com", "type": "User" },
        { "username": "pbailey91", "firstName": "Paul", "lastName": "Bailey", "email": "paul.b@mail.com", "type": "Moderator" },
        { "username": "qscott83", "firstName": "Quinn", "lastName": "Scott", "email": "quinn.s@mail.com", "type": "User" },
        { "username": "rlee80", "firstName": "Rachel", "lastName": "Lee", "email": "rachel.l@mail.com", "type": "User" },
        { "username": "scooper78", "firstName": "Samuel", "lastName": "Cooper", "email": "samuel.c@mail.com", "type": "Administrator" }
      ]
    );

    httpBackend.flush();

    expect(vm.users).toEqual([
      { "username": "jdoe1990", "firstName": "John", "lastName": "Doe", "email": "johndoe@mail.com", "type": "User" },
      { "username": "asmith1985", "firstName": "Alice", "lastName": "Smith", "email": "alice.smith@mail.com", "type": "User" },
      { "username": "bwilson92", "firstName": "Bob", "lastName": "Wilson", "email": "bob.wilson@mail.com", "type": "Administrator" },
      { "username": "cjohnson88", "firstName": "Charlie", "lastName": "Johnson", "email": "charlie.j@mail.com", "type": "User" },
      { "username": "dthomas79", "firstName": "David", "lastName": "Thomas", "email": "david.t@mail.com", "type": "Moderator" },
      { "username": "ejackson81", "firstName": "Emma", "lastName": "Jackson", "email": "emma.j@mail.com", "type": "User" },
      { "username": "fanderson87", "firstName": "Frank", "lastName": "Anderson", "email": "frank.a@mail.com", "type": "User" },
      { "username": "gwhite93", "firstName": "Grace", "lastName": "White", "email": "grace.w@mail.com", "type": "Administrator" },
      { "username": "hhall76", "firstName": "Hannah", "lastName": "Hall", "email": "hannah.h@mail.com", "type": "User" },
      { "username": "ijames90", "firstName": "Isaac", "lastName": "James", "email": "isaac.j@mail.com", "type": "User" },
      { "username": "jkent95", "firstName": "Jack", "lastName": "Kent", "email": "jack.k@mail.com", "type": "Moderator" },
      { "username": "kmiller89", "firstName": "Karen", "lastName": "Miller", "email": "karen.m@mail.com", "type": "User" },
      { "username": "lmartin86", "firstName": "Luke", "lastName": "Martin", "email": "luke.m@mail.com", "type": "User" },
      { "username": "mmorris77", "firstName": "Megan", "lastName": "Morris", "email": "megan.m@mail.com", "type": "Administrator" },
      { "username": "nroberts82", "firstName": "Noah", "lastName": "Roberts", "email": "noah.r@mail.com", "type": "User" },
      { "username": "owright84", "firstName": "Olivia", "lastName": "Wright", "email": "olivia.w@mail.com", "type": "User" },
      { "username": "pbailey91", "firstName": "Paul", "lastName": "Bailey", "email": "paul.b@mail.com", "type": "Moderator" },
      { "username": "qscott83", "firstName": "Quinn", "lastName": "Scott", "email": "quinn.s@mail.com", "type": "User" },
      { "username": "rlee80", "firstName": "Rachel", "lastName": "Lee", "email": "rachel.l@mail.com", "type": "User" },
      { "username": "scooper78", "firstName": "Samuel", "lastName": "Cooper", "email": "samuel.c@mail.com", "type": "Administrator" }
    ]);
  });

  it("should not contain users array - HTTP 404", function () {
    httpBackend.expectGET("assets/data/users.json").respond(404);
    httpBackend.flush();

    expect(vm.users).toEqual([]);
  });
});
