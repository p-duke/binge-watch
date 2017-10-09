require 'rails_helper'

RSpec.describe Resolvers::CreateMovie do
  let(:user) { User.create!(username: 'Garth', email: 'garth@gmail.com', password: '123456', password_confirmation: '123456') }
  let(:args) { { title: '36 Chambers', overview: 'Wu-Tang!', release_date: '2017-10-01', poster_path: 'rza/gza/method/man/odb', user_id: user.id } }
  let(:movie) { described_class.new.call(nil, args, {}) }

  describe 'creating a new movie' do
    it 'should create a valid movie' do
      expect(movie).to be_valid
      expect(movie.title).to eq('36 Chambers')
      expect(movie.user_id).to eq(user.id)
    end

    it 'should return error if its not valid' do
      args[:title] = nil
      expect(movie.errors.messages).to_not be_empty
    end
  end
end
