class Happening < ActiveRecord::Base
  attr_accessible :address, :coordinates, :description, :end_slot, :json_details, :meta, :source, :start_slot, :title, :when
end
