class AddCityCountryToHappening < ActiveRecord::Migration
  def change
    add_column :happenings, :city, :string, null: true
    add_column :happenings, :country, :string, null: true
  end
end
