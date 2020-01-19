require 'test_helper'

class DogsControllerTest < ActionDispatch::IntegrationTest
  test "should get map" do
    get dogs_map_url
    assert_response :success
  end

end
