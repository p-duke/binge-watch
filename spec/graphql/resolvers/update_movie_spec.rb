require 'rails_helper'

RSpec.describe Resolvers::UpdateMovie do
  let(:user) { User.create!(username: 'Tony Soprano', email: 'tony@gmail.com', password: '123456', password_confirmation: '123456') }
  let(:args) { { title: 'Goodfellas', overview: 'A couple of wise guys', release_date: '2017-10-01', poster_path: 'whats/the/matter/with/you!', user_id: user.id } }
  let(:movie) { Resolvers::CreateMovie.new.call(nil, args, {}) }

  describe 'updating a movie' do
    it 'should change the movies watched attr to true' do
      movie.update(watched: true)
      expect(movie).to be_valid
      expect(movie.watched).to eq(true)
    end
  end
end
