class AddStartingOnToHappenings < ActiveRecord::Migration
  def change
    add_column :happenings, :starting_on, :date, null: true
    add_column :happenings, :ending_on, :date, null: true
  end
end
