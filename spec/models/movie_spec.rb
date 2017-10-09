require 'rails_helper'

RSpec.describe Movie, type: :movie do
  let(:user) { User.create!(username: 'Garth', email: 'garth@gmail.com', password: '123456', password_confirmation: '123456') }
  subject(:movie) { Movie.create!(title: 'Subway eat fresh', overview: 'A boy and his sandwich', release_date: '2017-08-09', poster_path: '/look/at/me/now', user_id: user.id) }

  describe 'validations' do
    it 'can be created with valid attributes' do
      expect(movie).to be_valid
    end

    it 'cannot be created without a title' do
      movie.title = nil
      expect(movie).to_not be_valid
    end

    it 'is invalid if it does not contain an overview' do
      movie.overview = nil
      expect(movie).to_not be_valid
    end

    it 'is invalid if it does not contain a release_date' do
      movie.release_date = nil
      expect(movie).to_not be_valid
    end
  end
end
