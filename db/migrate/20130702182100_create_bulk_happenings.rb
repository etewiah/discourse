class CreateBulkHappenings < ActiveRecord::Migration
  def change
    create_table :bulk_happenings do |t|
      t.string :title
      t.datetime :when_retrieved
      t.text :raw_json
      t.string :source

      t.timestamps
    end
  end
end
