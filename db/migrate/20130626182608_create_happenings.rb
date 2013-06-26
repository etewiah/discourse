class CreateHappenings < ActiveRecord::Migration
  def change
    create_table :happenings do |t|
      t.string :title
      t.string :description
      t.string :start_slot
      t.datetime :when
      t.string :end_slot
      t.string :address
      t.text :coordinates, array: true
      t.text :meta, array: true
      t.text :json_details
      t.string :source

      t.timestamps
    end
  end
end
