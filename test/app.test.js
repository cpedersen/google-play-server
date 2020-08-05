const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('GET /apps', () => {
    it('should return an array of apps', () => {
      return supertest(app)
        .get('/apps')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf.at.least(1);
          const app = res.body[0];
          expect(app).to.include.all.keys(
              'App', 'Category', 'Rating', 'Reviews', 'Size', 'Installs', 'Type', 'Price', 'Content Rating', 'Genres', 'Last Updated', 'Current Ver', 'Android Ver'
          );
        });
    })

    it('should be 400 if sort is incorrect', () => {
        return supertest(app)
          .get('/apps')
          .query({ sort: 'MISTAKE' })
          .expect(400, 'Sort must be set to rating or app');
    });

    it('should sort by app', () => {
        return supertest(app)
          .get('/apps')
          .query({ sort: 'app' })
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => {
            expect(res.body).to.be.an('array');
            expect(res.body[0].App).to.equal('Angry Birds Rio');
            expect(res.body[1].App).to.equal('Block Puzzle');
            let sorted = true;
            let i = 0;
            // iterate once less than the length of the array
            // because we're comparing 2 items in the array at a time
            while (i < res.body.length - 1) {
              // compare app at `i` with next app at `i + 1`
              const appAtI = res.body[i];
              const appAtIPlus1 = res.body[i + 1];
              // if the next app is less than the app at i,
              if (appAtIPlus1.App < appAtI.App) {
                // the apps were not sorted correctly
                sorted = false;
                break; // exit the loop
              }
              i++;
            }
            expect(sorted).to.be.true;
            s

          });
    });

    it('should sort by rating', () => {
        return supertest(app)
          .get('/apps')
          .query({ sort: 'rating' })
          .expect('Content-Type', /json/)
          .then(res => {
            expect(res.body).to.be.an('array');
            let sorted = true;
            let i = 0;
            // iterate once less than the length of the array
            // because we're comparing 2 items in the array at a time
            while (i < res.body.length - 1) {
                // compare rating at `i` with next rating at `i + 1`
                const ratingAtI = parseFloat(res.body[i]);
                const ratingAtIPlus1 = parseFloat(res.body[i + 1]);
                // if the next rating is less than the rating at i,
                if (ratingAtIPlus1.Rating < ratingAtI.Rating) {
                  // the ratings were not sorted correctly
                  sorted = false;
                  break; // exit the loop
                }
                i++;
              }
              expect(sorted).to.be.true;
            });
    });

    it('should find correct genres', () => {
        return supertest(app)
          .get('/apps')
          .query({ genres: 'action' })
          .expect('Content-Type', /json/)
          .then(res => {
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf(6);
          });
    });
});


