require 'rails_helper'

RSpec.describe User, type: :model do
  before do
    @user = User.create!(username: 'Garth', email: 'garth@gmail.com', password: '123456', password_confirmation: '123456')
  end

  describe 'creation' do
    it 'can be created' do
      expect(@user).to be_valid
    end

    it 'cannot be created without a username' do
      @user.username = nil
      expect(@user).to_not be_valid
    end

    it 'cannot be created without an email' do
      @user.email = nil
      expect(@user).to_not be_valid
    end
  end

  describe 'authenticate' do
    let(:params) { { id: 1, username: 'Garth', email: 'garth@gmail.com', password: '123456', password_confirmation: '123456' } }
    let(:no_params) {}

    it 'returns true if the user is valid' do
      expect(@user.authenticate(params)).to be_truthy
    end

    it 'returns false if the user is invalid' do
      expect(@user.authenticate(no_params)).to be_falsey
    end
  end
end
