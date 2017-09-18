class CreateMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :movies do |t|
      t.string :title
      t.text :overview
      t.string :release_date
      t.text :poster_path
      t.boolean :watched, default: false
      t.integer :rating, default: 0
      t.references :user, index: true

      t.timestamps
    end
  end
end
