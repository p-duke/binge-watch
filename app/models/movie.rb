class Movie < ApplicationRecord
  validates :title, :overview, :release_date, presence: true

  belongs_to :user
end
